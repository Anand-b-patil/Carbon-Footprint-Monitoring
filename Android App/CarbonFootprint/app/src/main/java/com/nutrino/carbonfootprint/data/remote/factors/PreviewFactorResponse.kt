package com.nutrino.carbonfootprint.data.remote.factors

import kotlinx.serialization.Serializable

@Serializable
data class PreviewFactorResponse(
    val id: Int,
    val category: String,
    val geography: String,
    val version: Int,
    val factor_value: Double
)
