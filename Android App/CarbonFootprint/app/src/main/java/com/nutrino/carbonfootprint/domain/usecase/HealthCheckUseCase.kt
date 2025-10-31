package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.state.ResultState
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class HealthCheckUseCase @Inject constructor(
    private val httpClient: HttpClient
) {
    operator fun invoke(): Flow<ResultState<Map<String, String>>> = flow {
        emit(ResultState.Loading)
        try {
            val response = httpClient.get("${Constants.BASE_URL}/health")
            emit(ResultState.Success(response.body<Map<String, String>>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
