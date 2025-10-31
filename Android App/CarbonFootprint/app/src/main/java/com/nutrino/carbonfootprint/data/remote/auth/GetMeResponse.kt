package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class Organization(
    val id: Int = 0,
    val name: String = "",
    val plan: String = ""
)

@Serializable
data class GetMeResponse(
    val id: Int = 0,
    val email: String = "",
    val role: String = "",
    val org: Organization = Organization()
)
