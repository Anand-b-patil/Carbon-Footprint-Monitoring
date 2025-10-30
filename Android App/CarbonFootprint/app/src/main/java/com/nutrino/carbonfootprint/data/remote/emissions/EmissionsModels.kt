package com.nutrino.carbonfootprint.data.remote.emissions

import kotlinx.serialization.Serializable

@Serializable
data class ListEmissionsResponse(
    val emissions: List<EmissionResponse>,
    val total_count: Int,
    val page: Int,
    val limit: Int
)

@Serializable
data class RecomputeEmissionsRequest(
    val since: String,
    val until: String
)

@Serializable
data class RecomputeEmissionsResponse(
    val recalculated_events: Int
)
