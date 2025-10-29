package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FacilitiesRepository
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

class FacilitiesRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : FacilitiesRepository {

    override suspend fun createFacility(facilityRequest: CreateFacilityRequest): Flow<ResultState<FacilityResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.FACILITIES) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(facilityRequest)
            }
            emit(ResultState.Success(response.body<FacilityResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun getFacilities(): Flow<ResultState<List<FacilityResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.get(Constants.BASE_URL + Constants.FACILITIES) {
                headers {
                    append("Authorization", "Bearer $token")
                }
            }
            emit(ResultState.Success(response.body<List<FacilityResponse>>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
