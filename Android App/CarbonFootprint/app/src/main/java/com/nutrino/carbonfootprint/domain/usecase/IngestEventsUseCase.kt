package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsRequest
import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.IngestionRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class IngestEventsUseCase @Inject constructor(
    private val ingestionRepository: IngestionRepository
) {
    suspend operator fun invoke(ingestEventsRequest: IngestEventsRequest): Flow<ResultState<IngestEventsResponse>> {
        return ingestionRepository.ingestEvents(eventsRequest = ingestEventsRequest)
    }
}
