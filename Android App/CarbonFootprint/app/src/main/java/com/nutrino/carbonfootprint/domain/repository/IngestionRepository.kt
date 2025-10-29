package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow
import java.io.File

interface IngestionRepository {
    suspend fun ingestEvents(eventsRequest: IngestEventsRequest): Flow<ResultState<IngestEventsResponse>>
    suspend fun uploadCsv(csvFile: File): Flow<ResultState<IngestEventsResponse>>
}
