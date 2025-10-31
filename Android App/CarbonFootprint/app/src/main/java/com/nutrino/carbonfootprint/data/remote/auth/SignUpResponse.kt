package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class SignUpResponse(
    @SerialName("access_token")
    val accessToken: String,
    @SerialName("token_type")
    val tokenType: String
)