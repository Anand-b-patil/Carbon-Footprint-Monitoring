package com.nutrino.carbonfootprint.data.remote.factors

import kotlinx.serialization.Serializable

@Serializable
data class PreviewFactorResponse(
    val id: Int = 0,
    val category: String = "",
    val geography: String = "",
    val version: Int = 0,
    val factor_value: Double = 0.0
)
