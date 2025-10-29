package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.auth.GetMeResponse

sealed class MeUIState {
    object Idle : MeUIState()
    object Loading : MeUIState()
    data class Success(val data: GetMeResponse? = null) : MeUIState()
    data class Error(val error: String) : MeUIState()
}
