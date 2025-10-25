package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.ingestion.IngestEventsResponse

sealed class IngestEventsUIState {
    object Idle : IngestEventsUIState()
    object Loading : IngestEventsUIState()
    data class Success(val data: IngestEventsResponse? = null) : IngestEventsUIState()
    data class Error(val error: String) : IngestEventsUIState()
}
