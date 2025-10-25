package com.nutrino.carbonfootprint.data.repoImpl

import com.nutrino.carbonfootprint.constants.Constants
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.logs.debugLogs
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.IngestionRepository
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.forms.MultiPartFormDataContent
import io.ktor.client.request.forms.formData
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.Headers
import io.ktor.http.HttpHeaders
import io.ktor.http.contentType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class IngestionRepositoryImpl @Inject constructor(
    private val httpClient: HttpClient,
    private val userPrefrence: UserPrefrence
) : IngestionRepository {
    override suspend fun ingestEvents(ingestEventsRequest: IngestEventsRequest): Flow<ResultState<IngestEventsResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.INGEST_EVENTS) {
                header(HttpHeaders.Authorization, "Bearer $token")
                contentType(ContentType.Application.Json)
                setBody(ingestEventsRequest)
            }.body<IngestEventsResponse>()

            emit(ResultState.Success(response))

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.INGEST_EVENTS,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }

    override suspend fun uploadCsv(csvFile: ByteArray): Flow<ResultState<IngestEventsResponse>> = flow {
        emit(ResultState.Loading)
        try {
            val token = userPrefrence.acessToken.first()
            val response = httpClient.post(Constants.BASE_URL + Constants.UPLOAD_CSV) {
                header(HttpHeaders.Authorization, "Bearer $token")
                setBody(MultiPartFormDataContent(
                    formData {
                        append("file", csvFile, Headers.build {
                            append(HttpHeaders.ContentType, "text/csv")
                            append(HttpHeaders.ContentDisposition, "filename=events.csv")
                        })
                    }
                ))
            }.body<IngestEventsResponse>()

            emit(ResultState.Success(response))

        } catch (e: Exception){
            debugLogs(
                constant = Constants.BASE_URL + Constants.UPLOAD_CSV,
                e = e
            )
            emit(ResultState.Error(e.message ?: "Unknown error occurred"))
        }
    }
}
