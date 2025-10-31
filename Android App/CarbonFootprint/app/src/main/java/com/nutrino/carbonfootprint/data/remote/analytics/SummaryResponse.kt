package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class SummaryResponse(
    val total_co2e_kg: Double = 0.0,
    val scope1_kg: Double = 0.0,
    val scope2_kg: Double = 0.0,
    val scope3_kg: Double = 0.0,
    val facilities_count: Int = 0,
    val last_event_at: String? = null,
    @SerialName("top_categories")
    val topCategories: List<List<String>> = emptyList()
)
