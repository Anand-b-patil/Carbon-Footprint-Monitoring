package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.emissions.EmissionResponse
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsRequest
import com.nutrino.carbonfootprint.data.remote.emissions.RecomputeEmissionsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.EmissionsRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.parameter
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.first
import javax.inject.Inject

class EmissionsRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : EmissionsRepository {

    override suspend fun getEmissions(
        from: String?,
        to: String?,
        limit: Int?,
        offset: Int?
    ): Flow<ResultState<List<EmissionResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.EMISSIONS) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                from?.let { parameter("from", it) }
                to?.let { parameter("to", it) }
                limit?.let { parameter("limit", it) }
                offset?.let { parameter("offset", it) }
            }
            emit(ResultState.Success(response.body<List<EmissionResponse>>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun recomputeEmissions(request: RecomputeEmissionsRequest): Flow<ResultState<RecomputeEmissionsResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.EMISSIONS_RECOMPUTE) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(request)
            }
            emit(ResultState.Success(response.body<RecomputeEmissionsResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
