package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.auth.SignInRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignInResponse
import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignUpResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AuthRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor(
    private  val userPrefrence: UserPrefrence,
    private val httpClient: HttpClient
) : AuthRepository {
    override suspend fun signUp(signUpRequest: SignUpRequest): Flow<ResultState<SignUpResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val httpResponse = httpClient.post(Constants.BASE_URL + Constants.SIGN_UP) {
                this.setBody(signUpRequest)
                this.contentType(ContentType.Application.Json)
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<SignUpResponse>()
                // Store user session with the returned user_id (handle optional user_id)
                val userId = response.user_id ?: 0 // Use 0 as fallback if user_id is null
                userPrefrence.updateUserSession(
                    userId = userId,
                    email = signUpRequest.email,
                    role = "admin" // Default role for organization creator
                )
                emit(ResultState.Success(response))
            } else {
                val errorBody = try {
                    httpResponse.body<String>()
                } catch (e: Exception) {
                    "HTTP ${httpResponse.status.value}"
                }
                debugLogs(
                    constant = Constants.BASE_URL + Constants.SIGN_UP,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.SIGN_UP,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }

    override suspend fun signIn(signInRequest: SignInRequest): Flow<ResultState<SignInResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val httpResponse = httpClient.post(Constants.BASE_URL + Constants.SIGN_IN) {
                this.setBody(signInRequest)
                this.contentType(ContentType.Application.Json)
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<SignInResponse>()
                // Store user session with the returned user_id (handle optional user_id)
                val userId = response.user_id ?: 0 // Use 0 as fallback if user_id is null
                userPrefrence.updateUserSession(
                    userId = userId,
                    email = signInRequest.email
                )
                emit(ResultState.Success(response))
            } else {
                val errorBody = try {
                    httpResponse.body<String>()
                } catch (e: Exception) {
                    "HTTP ${httpResponse.status.value}"
                }
                debugLogs(
                    constant = Constants.BASE_URL + Constants.SIGN_IN,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.SIGN_IN,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}