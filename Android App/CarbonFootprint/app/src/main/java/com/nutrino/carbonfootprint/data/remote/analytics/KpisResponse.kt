package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable

@Serializable
data class KpisResponse(
    val total_co2e_kg: Double = 0.0,
    val scope1_kg: Double = 0.0,
    val scope2_kg: Double = 0.0,
    val scope3_kg: Double = 0.0
)
