package com.nutrino.carbonfootprint.data.remote.emissions

import kotlinx.serialization.Serializable

@Serializable
data class EmissionResponse(
    val id: Int = 0,
    val event_id: Int = 0,
    val factor_id: Int = 0,
    val scope: String = "",
    val co2e_kg: Double = 0.0,
    val occurred_at: String = "",
    val category: String = ""
)
