package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignInResponse(
    val access_token: String? = null,
    val token_type: String? = null
)