package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.auth.SignInResponse

sealed class SignInUIState {
    object Idle : SignInUIState()
    object Loading : SignInUIState()
    data class Success(val data: SignInResponse? = null) : SignInUIState()
    data class Error(val error: String) : SignInUIState()
}
