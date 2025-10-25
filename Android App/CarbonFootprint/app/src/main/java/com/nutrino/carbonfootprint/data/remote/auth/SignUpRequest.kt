package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class SignUpRequest(
    val email: String,
    val org_name: String,
    val password: String
)