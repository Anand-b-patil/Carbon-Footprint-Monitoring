package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignInRequest(
    val email: String = "",
    val password: String = ""
)