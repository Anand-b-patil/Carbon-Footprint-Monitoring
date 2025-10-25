package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface IngestionRepository {
    suspend fun ingestEvents(ingestEventsRequest: IngestEventsRequest): Flow<ResultState<IngestEventsResponse>>
    suspend fun uploadCsv(csvFile: ByteArray): Flow<ResultState<IngestEventsResponse>>
}
