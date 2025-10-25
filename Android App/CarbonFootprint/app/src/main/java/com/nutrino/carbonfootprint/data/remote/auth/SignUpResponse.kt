package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignUpResponse(
    val access_token: String,
    val token_type: String
)