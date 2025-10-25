package com.nutrino.carbonfootprint.data.remote.facilities

import kotlinx.serialization.Serializable

@Serializable
data class CreateFacilityRequest(
    val name: String,
    val country: String? = null,
    val grid_region: String? = null
)
