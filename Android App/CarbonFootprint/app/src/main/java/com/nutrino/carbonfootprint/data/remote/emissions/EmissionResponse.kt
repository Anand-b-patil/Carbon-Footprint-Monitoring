package com.nutrino.carbonfootprint.data.remote.emissions

import kotlinx.serialization.Serializable

@Serializable
data class EmissionResponse(
    val id: Int,
    val event_id: Int,
    val factor_id: Int,
    val scope: String,
    val co2e_kg: Double,
    val occurred_at: String,
    val category: String
)
