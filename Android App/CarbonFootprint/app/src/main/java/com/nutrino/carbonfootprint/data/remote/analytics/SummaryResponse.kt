package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class SummaryResponse(
    val total_co2e_kg: Double,
    val scope1_kg: Double,
    val scope2_kg: Double,
    val scope3_kg: Double,
    val facilities_count: Int,
    val last_event_at: String? = null,
    @SerialName("top_categories")
    val topCategories: List<List<String>> = emptyList()
)
