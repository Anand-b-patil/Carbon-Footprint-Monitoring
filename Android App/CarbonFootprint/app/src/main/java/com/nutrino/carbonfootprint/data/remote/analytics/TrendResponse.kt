package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable

@Serializable
data class TrendResponse(
    val period: String,
    val co2e_kg: Double
)
