package com.nutrino.carbonfootprint.data.remote.factors

import kotlinx.serialization.Serializable

@Serializable
data class FactorResponse(
    val id: Int = 0,
    val namespace: String = "",
    val category: String = "",
    val unit_in: String = "",
    val unit_out: String = "",
    val factor_value: Double = 0.0,
    val gwp_horizon: Int = 0,
    val geography: String = "",
    val vendor: String = "",
    val method: String = "",
    val valid_from: String = "",
    val valid_to: String = "",
    val version: Int = 0
)
