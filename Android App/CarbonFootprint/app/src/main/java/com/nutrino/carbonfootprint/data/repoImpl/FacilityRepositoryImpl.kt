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
            val userId = userPrefrence.userId.first()
            if (userId == null) {
                emit(ResultState.Error("User not logged in"))
                return@flow
            }

            val httpResponse = httpClient.get(Constants.BASE_URL + Constants.FACILITIES)

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
            val userId = userPrefrence.userId.first()
            if (userId == null) {
                emit(ResultState.Error("User not logged in"))
                return@flow
            }

            val userRole = userPrefrence.userRole.first()
            if (userRole != "admin") {
                emit(ResultState.Error("Only admins can create facilities"))
                return@flow
            }

            val httpResponse = httpClient.post(Constants.BASE_URL + Constants.FACILITIES) {
                contentType(ContentType.Application.Json)
                setBody(createFacilityRequest)
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
