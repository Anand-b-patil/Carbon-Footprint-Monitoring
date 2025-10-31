package com.nutrino.carbonfootprint.data.remote.auth

import kotlinx.serialization.Serializable

@Serializable
data class MeResponse(
    val id: Int = 0,
    val email: String = "",
    val role: String = "",
    val org: OrgInfo = OrgInfo()
)

@Serializable
data class OrgInfo(
    val id: Int = 0,
    val name: String = "",
    val plan: String = ""
)
