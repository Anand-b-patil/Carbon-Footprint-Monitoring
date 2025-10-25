package com.nutrino.carbonfootprint.data.remote.users

import kotlinx.serialization.Serializable

@Serializable
data class UserResponse(
    val id: Int,
    val email: String,
    val role: String,
    val is_active: Boolean
)
