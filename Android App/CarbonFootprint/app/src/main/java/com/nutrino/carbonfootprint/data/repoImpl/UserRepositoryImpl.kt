package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.auth.MeResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.UserRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.header
import io.ktor.http.HttpHeaders
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class UserRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : UserRepository {
    override suspend fun getMe(): Flow<ResultState<MeResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.GET_ME) {
                header(HttpHeaders.Authorization, "Bearer $token")
            }.body<MeResponse>()

            emit(ResultState.Success(response))

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.GET_ME,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}
