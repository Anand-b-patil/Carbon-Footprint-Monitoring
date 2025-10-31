package com.nutrino.carbonfootprint.data.remote.emissions

import kotlinx.serialization.Serializable

@Serializable
data class ListEmissionsResponse(
    val emissions: List<EmissionResponse> = emptyList(),
    val total_count: Int = 0,
    val page: Int = 0,
    val limit: Int = 0
)

@Serializable
data class RecomputeEmissionsRequest(
    val since: String = "",
    val until: String = ""
)

@Serializable
data class RecomputeEmissionsResponse(
    val recalculated_events: Int = 0
)
