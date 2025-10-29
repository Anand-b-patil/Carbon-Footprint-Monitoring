package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignUpResponse(
    val user_id: Int? = null,
    val message: String? = null,
    val success: Boolean? = null
)