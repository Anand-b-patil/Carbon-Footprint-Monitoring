package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.analytics.KpisResponse
import com.nutrino.carbonfootprint.data.remote.analytics.SummaryResponse
import com.nutrino.carbonfootprint.data.remote.analytics.TrendResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AnalyticsRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.parameter
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject

class AnalyticsRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : AnalyticsRepository {

    override suspend fun getKpis(from: String?, to: String?): Flow<ResultState<KpisResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_KPIS) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                from?.let { parameter("from", it) }
                to?.let { parameter("to", it) }
            }
            emit(ResultState.Success(response.body<KpisResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun getTrend(from: String?, to: String?, grain: String?): Flow<ResultState<TrendResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_TREND) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                from?.let { parameter("from", it) }
                to?.let { parameter("to", it) }
                grain?.let { parameter("grain", it) }
            }
            emit(ResultState.Success(response.body<TrendResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun getSummary(): Flow<ResultState<SummaryResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.ANALYTICS_SUMMARY) {
                headers {
                    append("Authorization", "Bearer $token")
                }
            }
            emit(ResultState.Success(response.body<SummaryResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
