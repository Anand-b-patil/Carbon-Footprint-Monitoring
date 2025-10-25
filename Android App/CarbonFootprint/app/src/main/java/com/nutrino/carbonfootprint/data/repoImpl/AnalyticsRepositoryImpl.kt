package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.analytics.KpisResponse
import com.nutrino.carbonfootprint.data.remote.analytics.SummaryResponse
import com.nutrino.carbonfootprint.data.remote.analytics.TrendResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AnalyticsRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.header
import io.ktor.client.request.parameter
import io.ktor.http.HttpHeaders
import io.ktor.http.isSuccess
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class AnalyticsRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : AnalyticsRepository {
    override suspend fun getKpis(from: String, to: String): Flow<ResultState<KpisResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val httpResponse = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_KPIS) {
                header(HttpHeaders.Authorization, "Bearer $token")
                parameter("from", from)
                parameter("to", to)
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<KpisResponse>()
                emit(ResultState.Success(response))
            } else {
                val errorBody = httpResponse.body<String>()
                debugLogs(
                    constant = Constants.BASE_URL + Constants.ANALYTICS_KPIS,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.ANALYTICS_KPIS,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }

    override suspend fun getTrend(grain: String, from: String, to: String): Flow<ResultState<List<TrendResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val httpResponse = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_TREND) {
                header(HttpHeaders.Authorization, "Bearer $token")
                parameter("grain", grain)
                parameter("from", from)
                parameter("to", to)
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<List<TrendResponse>>()
                emit(ResultState.Success(response))
            } else {
                val errorBody = httpResponse.body<String>()
                debugLogs(
                    constant = Constants.BASE_URL + Constants.ANALYTICS_TREND,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.ANALYTICS_TREND,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }

    override suspend fun getSummary(): Flow<ResultState<SummaryResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val httpResponse = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_SUMMARY) {
                header(HttpHeaders.Authorization, "Bearer $token")
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<SummaryResponse>()
                emit(ResultState.Success(response))
            } else {
                val errorBody = httpResponse.body<String>()
                debugLogs(
                    constant = Constants.BASE_URL + Constants.ANALYTICS_SUMMARY,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.ANALYTICS_SUMMARY,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}
