package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.facilities.CreateFacilityRequest
import com.nutrino.carbonfootprint.data.remote.facilities.FacilityResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.FacilityRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class FacilityRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : FacilityRepository {
    override suspend fun getFacilities(): Flow<ResultState<List<FacilityResponse>>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.accessToken.first()
            if (token.isNullOrEmpty()) {
                emit(ResultState.Error("User not logged in"))
                return@flow
            }

            val httpResponse = httpClient.get(Constants.BASE_URL + Constants.FACILITIES) {
                headers {
                    append("Authorization", "Bearer $token")
                }
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<List<FacilityResponse>>()
                emit(ResultState.Success(response))
            } else {
                val errorBody = try {
                    httpResponse.body<String>()
                } catch (e: Exception) {
                    "HTTP ${httpResponse.status.value}"
                }
                debugLogs(
                    constant = Constants.BASE_URL + Constants.FACILITIES,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.FACILITIES,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }

    override suspend fun createFacility(createFacilityRequest: CreateFacilityRequest): Flow<ResultState<FacilityResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.accessToken.first()
            if (token.isNullOrEmpty()) {
                emit(ResultState.Error("User not logged in"))
                return@flow
            }

            // Sanitize country to meet API requirement (ISO-2 -> max 2 uppercase chars)
            val sanitizedCountry = createFacilityRequest.country.trim().let { input ->
                when {
                    input.isBlank() -> ""
                    input.equals("Unknown", ignoreCase = true) -> ""
                    input.length == 2 -> input.uppercase()
                    input.length > 2 -> input.take(2).uppercase()
                    else -> input.uppercase()
                }
            }
            val sanitizedRequest = createFacilityRequest.copy(
                country = sanitizedCountry,
                grid_region = createFacilityRequest.grid_region.trim()
            )

            val httpResponse = httpClient.post(Constants.BASE_URL + Constants.FACILITIES) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(sanitizedRequest)
            }

            if (httpResponse.status.isSuccess()) {
                val response = httpResponse.body<FacilityResponse>()
                emit(ResultState.Success(response))
            } else {
                val errorBody = try {
                    httpResponse.body<String>()
                } catch (e: Exception) {
                    "HTTP ${httpResponse.status.value}"
                }
                debugLogs(
                    constant = Constants.BASE_URL + Constants.FACILITIES,
                    e = Exception("HTTP ${httpResponse.status.value}: $errorBody")
                )
                emit(ResultState.Error("Server error: ${httpResponse.status.value} - $errorBody"))
            }

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.FACILITIES,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}
