package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.analytics.KpisResponse

sealed class KpisUIState {
    object Idle : KpisUIState()
    object Loading : KpisUIState()
    data class Success(val data: KpisResponse? = null) : KpisUIState()
    data class Error(val error: String) : KpisUIState()
}
