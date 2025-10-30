package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class Organization(
    val id: Int,
    val name: String,
    val plan: String
)

@Serializable
data class GetMeResponse(
    val id: Int,
    val email: String,
    val role: String,
    val org: Organization
)
