package com.nutrino.carbonfootprint.data.remote.users

import kotlinx.serialization.Serializable

@Serializable
data class CreateUserRequest(
    val email: String,
    val password: String,
    val role: String
)
