package com.nutrino.carbonfootprint.data.remote.emissions

import kotlinx.serialization.Serializable

@Serializable
data class RecomputeEmissionsRequest(
    val since: String,
    val until: String
)

@Serializable
data class RecomputeEmissionsResponse(
    val recalculated_events: Int
)
