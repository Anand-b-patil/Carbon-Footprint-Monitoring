package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.ReportsRepository
import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.parameter
import io.ktor.client.statement.HttpResponse
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject

class ReportsRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : ReportsRepository {

    override suspend fun exportReport(from: String, to: String): Flow<ResultState<HttpResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.REPORTS_PERIOD) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                parameter("from", from)
                parameter("to", to)
            }
            emit(ResultState.Success(response))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
