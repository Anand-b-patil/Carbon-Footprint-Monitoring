package com.nutrino.carbonfootprint.presentation.state

import com.nutrino.carbonfootprint.data.remote.auth.SignUpResponse

sealed class SignUpUIState {
    object Idle : SignUpUIState()
    object Loading : SignUpUIState()
    data class Success(val data: SignUpResponse?= null) : SignUpUIState()
    data class Error(val error: String) : SignUpUIState()
}