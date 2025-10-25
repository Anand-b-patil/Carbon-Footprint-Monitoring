package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.auth.MeResponse

sealed class MeUIState {
    object Idle : MeUIState()
    object Loading : MeUIState()
    data class Success(val data: MeResponse? = null) : MeUIState()
    data class Error(val error: String) : MeUIState()
}
