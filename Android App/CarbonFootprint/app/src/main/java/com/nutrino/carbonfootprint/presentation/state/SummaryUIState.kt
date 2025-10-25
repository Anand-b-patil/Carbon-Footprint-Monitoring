package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.analytics.SummaryResponse

sealed class SummaryUIState {
    object Idle : SummaryUIState()
    object Loading : SummaryUIState()
    data class Success(val data: SummaryResponse? = null) : SummaryUIState()
    data class Error(val error: String) : SummaryUIState()
}
