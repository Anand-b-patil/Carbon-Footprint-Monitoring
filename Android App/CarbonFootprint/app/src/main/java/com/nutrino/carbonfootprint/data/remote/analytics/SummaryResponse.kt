package com.nutrino.carbonfootprint.data.remote.analytics

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class TopCategoryItem(
    val name: String,
    val value: Double
) {
    companion object {
        fun fromArray(array: List<String>): TopCategoryItem? {
            return if (array.size >= 2) {
                try {
                    TopCategoryItem(
                        name = array[0],
                        value = array[1].toDouble()
                    )
                } catch (e: Exception) {
                    null
                }
            } else null
        }
    }
}

@Serializable
data class SummaryResponse(
    val total_co2e_kg: Double,
    val scope1_kg: Double,
    val scope2_kg: Double,
    val scope3_kg: Double,
    val facilities_count: Int,
    val last_event_at: String? = null,
    @SerialName("top_categories")
    private val _topCategories: List<List<String>> = emptyList()
) {
    val topCategories: List<TopCategoryItem>
        get() = _topCategories.mapNotNull { array ->
            if (array.size >= 2) {
                try {
                    TopCategoryItem(
                        name = array[0],
                        value = array[1].toDouble()
                    )
                } catch (e: Exception) {
                    null
                }
            } else null
        }
}
