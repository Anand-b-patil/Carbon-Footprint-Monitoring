package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.IngestionRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.forms.MultiPartFormDataContent
import io.ktor.client.request.forms.formData
import io.ktor.client.request.headers
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.first
import java.io.File
import javax.inject.Inject

class IngestionRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : IngestionRepository {

    override suspend fun ingestEvents(eventsRequest: IngestEventsRequest): Flow<ResultState<IngestEventsResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.INGEST_EVENTS) {
                contentType(ContentType.Application.Json)
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(eventsRequest)
            }
            emit(ResultState.Success(response.body<IngestEventsResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }

    override suspend fun uploadCsv(csvFile: File): Flow<ResultState<IngestEventsResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.UPLOAD_CSV) {
                headers {
                    append("Authorization", "Bearer $token")
                }
                setBody(MultiPartFormDataContent(
                    formData {
                        append("file", csvFile.readBytes(), io.ktor.http.Headers.build {
                            append(io.ktor.http.HttpHeaders.ContentType, "text/csv")
                            append(io.ktor.http.HttpHeaders.ContentDisposition, "filename=\"${csvFile.name}\"")
                        })
                    }
                ))
            }
            emit(ResultState.Success(response.body<IngestEventsResponse>()))
        } catch (e: Exception) {
            emit(ResultState.Error("Network error: ${e.message}"))
        }
    }
}
