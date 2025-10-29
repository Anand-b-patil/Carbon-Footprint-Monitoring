package com.nutrino.carbonfootprint.data.remote.facilities

import kotlinx.serialization.Serializable

@Serializable
data class CreateFacilityRequest(
    val name: String,
    val country: String,
    val grid_region: String
)

@Serializable
data class FacilityResponse(
    val id: Int,
    val name: String,
    val country: String,
    val grid_region: String
)
