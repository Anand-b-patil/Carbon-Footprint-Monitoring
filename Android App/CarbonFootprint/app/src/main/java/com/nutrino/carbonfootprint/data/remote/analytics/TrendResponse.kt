package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable

@Serializable
data class TrendResponse(
    val period: String,
    val total_co2e_kg: Double,
    val scope1_kg: Double,
    val scope2_kg: Double,
    val scope3_kg: Double
)
