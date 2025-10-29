package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.users.CreateUserRequest
import com.nutrino.carbonfootprint.data.remote.users.UserResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.UsersRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject

class UsersRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : UsersRepository {

    override suspend fun createUser(userRequest: CreateUserRequest): Flow<ResultState<UserResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.USERS) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(userRequest)
            }
            emit(ResultState.Success(response.body<UserResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun getUsers(): Flow<ResultState<List<UserResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.USERS) {
                headers {
                    append("Authorization", "Bearer $token")
                }
            }
            emit(ResultState.Success(response.body<List<UserResponse>>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
