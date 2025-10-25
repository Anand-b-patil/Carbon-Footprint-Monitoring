package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.auth.SignUpRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignUpResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AuthRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
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
            val response = httpClient.post(Constants.BASE_URL + Constants.SIGN_UP) {
                this.setBody(signUpRequest)
                this.contentType(ContentType.Application.Json)
            }.body<SignUpResponse>()

            if (response.access_token.isNotEmpty()){
                userPrefrence.updateAcessToken(response.access_token)
                emit(ResultState.Success(response))
            } else {
                emit(ResultState.Error("Access Token is null"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.SIGN_UP,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}