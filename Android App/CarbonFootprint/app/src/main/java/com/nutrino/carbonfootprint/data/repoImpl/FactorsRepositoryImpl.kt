package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.factors.CreateFactorRequest
import com.nutrino.carbonfootprint.data.remote.factors.FactorResponse
import com.nutrino.carbonfootprint.data.remote.factors.PreviewFactorResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FactorsRepository
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

class FactorsRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : FactorsRepository {

    override suspend fun createFactor(factorRequest: CreateFactorRequest): Flow<ResultState<FactorResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.FACTORS) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(factorRequest)
            }
            emit(ResultState.Success(response.body<FactorResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun getFactors(
        category: String?,
        geography: String?,
        validOn: String?
    ): Flow<ResultState<List<FactorResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.FACTORS) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                category?.let { parameter("category", it) }
                geography?.let { parameter("geography", it) }
                validOn?.let { parameter("valid_on", it) }
            }
            emit(ResultState.Success(response.body<List<FactorResponse>>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun previewFactor(
        category: String,
        occurredAt: String,
        geography: String
    ): Flow<ResultState<PreviewFactorResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.FACTORS_PREVIEW) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                parameter("category", category)
                parameter("occurred_at", occurredAt)
                parameter("geography", geography)
            }
            emit(ResultState.Success(response.body<PreviewFactorResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
