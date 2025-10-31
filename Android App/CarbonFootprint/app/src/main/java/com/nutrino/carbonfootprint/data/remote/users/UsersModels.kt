package com.nutrino.carbonfootprint.data.remote.users

import kotlinx.serialization.Serializable

@Serializable
data class CreateUserRequest(
    val email: String = "",
    val password: String = "",
    val role: String = ""
)

@Serializable
data class UserResponse(
    val id: Int = 0,
    val email: String = "",
    val role: String = "",
    val is_active: Boolean = false
)
