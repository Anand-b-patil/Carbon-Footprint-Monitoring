package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class MeResponse(
    val id: Int,
    val email: String,
    val role: String,
    val org: OrgInfo
)

@Serializable
data class OrgInfo(
    val id: Int,
    val name: String,
    val plan: String
)
